export default interface Post {
  _path: string;
  date?: string;
  description: string;
  image?: {
    alt?: string;
    src?: string;
  };
  title: string;
}
