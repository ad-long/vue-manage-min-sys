import http from '../utils/http';

export const fetchData = () => {
    return http({
        url: './table.json',
        method: 'get'
    });
};
