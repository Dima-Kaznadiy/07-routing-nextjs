'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

interface Props {
    tag?: NoteTag | 'all';
}

export default function NotesClient({ tag }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', tag],
        queryFn: () =>
            fetchNotes({
                page: 1,
                tag,
            }),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error</p>;

    return (
        <ul>
            {data.notes.map((note) => (
                <li key={note.id}>{note.title}</li>
            ))}
        </ul>
    );
}

