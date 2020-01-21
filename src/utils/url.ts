export const parseReponame = (raw: string) => {
    const url = new URL(raw);
    const query = url.searchParams.get('q');
    if (!query) {
        return ''
    }
    const options = query.split(' ');
    for (const option of options) {
        if (option.startsWith('repo:')) {
            return option.substr(5);
        }
    }
    return '';
}
