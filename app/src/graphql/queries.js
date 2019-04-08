// eslint-disable
// this is an auto generated file. This will be overwritten

export const getBlock = `query GetBlock($id: Int!) {
  getBlock(id: $id) {
    id
    grade
    statement
    location
    likes
    views
  }
}
`;
export const listBlocks = `query ListBlocks(
  $filter: TableBlockFilterInput
  $limit: Int
  $nextToken: String
) {
  listBlocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      grade
      statement
      location
      likes
      views
    }
    nextToken
  }
}
`;
