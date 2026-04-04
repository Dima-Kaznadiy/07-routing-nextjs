

'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';

interface Props {
    id: string;
}

export default function NotePreview({ id }: Props) {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false, // ✅ ОБОВʼЯЗКОВО
    });

    const handleClose = () => {
        router.back(); // ✅ ОБОВʼЯЗКОВО
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading note</p>;

    return (
        <div>
            {/* 🔥 КНОПКА ЗАКРИТТЯ */}
            <button onClick={handleClose}>Close</button>

            <h2>{data.title}</h2>
            <p>{data.content}</p>
            <p>{data.tag}</p>
            <p>{data.createdAt}</p>
        </div>
    );
}