import PostCard from "./PostCard";

const PostPlaceholder = () => {
  var posts: JSX.Element[] = [];
  for (let i = 0; i < 6; i++) {
    posts.push(<PostCard key={i} loading={true} />);
  }
  return posts;
};

export default function Blog() {
  return (
    <div className="container flex flex-col mx-auto items-center justify-between gap-8 h-full py-8 md:py-16 px-4 md:px-0">
      <div className="flex flex-col space-y-5 text-center">
        <h1 className="text-4xl">Blog</h1>
        <h2 className="text-2xl">tutorial, quotes, random story, rant, etc.</h2>
      </div>
      <div className="flex gap-12 overflow-x-scroll w-full snap-x h-fit">
        {PostPlaceholder()}
      </div>
    </div>
  );
}
