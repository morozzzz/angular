export interface Source {
    id: string;
    name: string;
}

export interface Article {
    author: string;
    publishedAt: string;
    title: string;
    content: string;
    description: string;
    urlToImage: string;
    url: string;
    _id?: string;
}

export interface Store {
    webArticles: Array<Article>,
    myArticles: Array<Article>,
    sources: Array<Source>,
    sourcesMap: Object,
    state: State
}

export interface State {
    page: number,
    articleLimit: number,
    isMyServer: boolean,
    currentSource: Source,
    status: string
}

export interface NewsAPIResponse {
    articles: Array<Article>;
    status: string;
    totalResults: number;
}