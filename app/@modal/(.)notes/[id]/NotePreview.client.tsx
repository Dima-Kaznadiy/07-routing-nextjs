'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface Props {
    id: string;
}

export default function NotePreview({ id }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error</p>;

    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            <p>{data.tag}</p>
            <p>{data.createdAt}</p>
        </div>
    );
}