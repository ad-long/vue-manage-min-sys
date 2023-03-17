export const table = {
    icon: 'Calendar',
    index: '#',
    title: '表格相关',
    permiss: '2',
    subs: [
        {
            index: '/table',
            title: '常用表格',
            permiss: '2',
            
            component: () => import('../../views/table.vue'),
        }
    ]
};