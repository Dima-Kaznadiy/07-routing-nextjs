import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

export default async function FilterPage({
    params,
}: {
    params: { slug: string[] };
}) {
    const tag = params.slug?.[0] as NoteTag | 'all';

    const data = await fetchNotes({
        page: 1,
        tag: tag === 'all' ? undefined : tag,
    });

    return <div>Notes filtered</div>;
}