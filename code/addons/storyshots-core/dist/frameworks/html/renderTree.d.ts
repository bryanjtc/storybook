declare function getRenderedTree(story: {
    render: () => any;
}): Node;
export default getRenderedTree;
