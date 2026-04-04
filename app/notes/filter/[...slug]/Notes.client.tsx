

'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface Props {
    tag: NoteTag | 'all';
}

export default function NotesClient({ tag }: Props) {
    // 🔥 СТАНИ
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 🔥 DEBOUNCE
    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 300);

    // 🔥 QUERY
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, search, tag],
        queryFn: () =>
            fetchNotes({
                page,
                search,
                tag,
            }),
        placeholderData: (prev) => prev,
    });

    // 🔥 ОБРОБНИКИ
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading notes</p>;

    return (
        <div>
            {/* 🔍 SEARCH */}
            <SearchBox onSearch={handleSearch} />

            {/* ➕ BUTTON */}
            <button onClick={openModal}>Create note</button>

            {/* 📝 LIST */}
            <NoteList notes={data.notes} />

            {/* 📄 PAGINATION */}
            <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
            />

            {/* 🪟 MODAL */}
            {isModalOpen && (
                <Modal>
                    <NoteForm onClose={closeModal} />
                </Modal>
            )}
        </div>
    );
}