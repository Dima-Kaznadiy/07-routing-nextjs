

// import NotesClient from './Notes.client';
// import type { NoteTag } from '@/types/note';

// export default function Page({
//     params,
// }: {
//     params: { slug: string[] };
// }) {
//     const tag = params.slug?.[0] as NoteTag | 'all';

//     return <NotesClient tag={tag} />;
// }


import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params; // ✅

    const tag = slug?.[0] as NoteTag | 'all';

    return <NotesClient tag={tag} />;
}