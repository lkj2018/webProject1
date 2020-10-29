export default [
    {
        path: "/overview",
        name: "overview",
        component: () => import("@/views/Overview"),
        meta: {
            title: "总览"
        }
    }
]