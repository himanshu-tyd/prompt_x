import Link from "next/link";

const Form = ({ type, setPost, post, submitting, handleSubmit }) => {
  return (
    <section className="flex flex-col max-w-full w-full flex-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>

      <p className="desc text-left max-w-md ">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-Powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write your prompt here"
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Tag {``}
            <span className="font-normal">
              (#Product, #webdevelopment, #ideas)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            placeholder="#tag"
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4 ">
          <Link href={"/"} className="text-gray-500 text-sm ">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="px-5 py-1.5 bg-primary-orange rounded-full text-white hover:bg-orange-500">
            {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
