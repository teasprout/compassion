// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateBlock = `subscription OnCreateBlock(
  $id: Int
  $grade: String
  $statement: String
  $location: String
  $likes: String
) {
  onCreateBlock(
    id: $id
    grade: $grade
    statement: $statement
    location: $location
    likes: $likes
  ) {
    id
    grade
    statement
    location
    likes
    views
  }
}
`;
export const onUpdateBlock = `subscription OnUpdateBlock(
  $id: Int
  $grade: String
  $statement: String
  $location: String
  $likes: String
) {
  onUpdateBlock(
    id: $id
    grade: $grade
    statement: $statement
    location: $location
    likes: $likes
  ) {
    id
    grade
    statement
    location
    likes
    views
  }
}
`;
export const onDeleteBlock = `subscription OnDeleteBlock(
  $id: Int
  $grade: String
  $statement: String
  $location: String
  $likes: String
) {
  onDeleteBlock(
    id: $id
    grade: $grade
    statement: $statement
    location: $location
    likes: $likes
  ) {
    id
    grade
    statement
    location
    likes
    views
  }
}
`;
