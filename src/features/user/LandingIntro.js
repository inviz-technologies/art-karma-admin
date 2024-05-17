import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold ">
            <img
              src="/logo.jpg"
              className=" inline-block mr-2 mask mask-circle"
              alt="dashwind-logo"
            />
          </h1>
          <h1 className="font-bold text-3xl text-center"> The Art Karma</h1>
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
