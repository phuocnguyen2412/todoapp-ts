export interface PaginationParams {
    skip: number;
    limit: number;
}

export function getPagination(page: number = 1, limit: number = 10): PaginationParams {
  
    const currentPage = Math.max(1, page);
    const maxLimit = Math.max(1, limit);

    const skip = (currentPage - 1) * maxLimit;

    return {
        skip,
        limit: maxLimit,
    };
}
