import { useForm } from "react-hook-form";
import { InputForm } from "../atoms/Input";
import { Google } from "../atoms/Icon";
import { LoginAdmin } from "../../utils/auth";
import { useRouter } from "next/router";

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const handleLogin = async (d) => {
    const loginData = {
      admin_name: d.username,
      admin_password: d.password,
    };
    try {
      await LoginAdmin(loginData);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative py-3 flex items-center justify-center h-full w-full">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-2xl rounded-3xl sm:p-10 border-solid border-[1px] border-slate-300">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5 justify-center text-3xl font-bold">
              TGDD
            </div>
            <div className="mt-5">
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="login"
              >
                E-mail
              </label>

              <InputForm
                register={register("username", {
                  required: "username cannot be left blank",
                })}
                type="text"
                placeholder={"username"}
              />
              {errors.username && errors.username.type === "required" && (
                <p className="text-red text-xs italic">
                  {errors.username.message}
                </p>
              )}
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block mt-5"
                htmlFor="password"
              >
                Password
              </label>
              <InputForm
                register={register("password", {
                  required: "password cannot be left blank",
                })}
                type="password"
                placeholder={"password"}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="text-red text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center w-full items-center mt-10">
              <div>
                <button className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg hover:bg-slate-400 hover:text-white">
                  <Google className={"w-6"} />
                  <span className="ml-2">Sign in with Google</span>
                </button>
              </div>
            </div>
            <div className="mt-5">
              <button
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
