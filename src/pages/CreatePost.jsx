import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Loader, ButtonLoader, FormField } from "../components";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://ai-image-backend-abdallanoor.vercel.app/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ai-image-backend-abdallanoor.vercel.app/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <>
      <section className="mx-auto">
        <div>
          <h1 className="font-extrabold text-white/90 text-3xl">Create</h1>
          {/* <p className="mt-2 text-gray-500 max-w-[500px]">
            Create imaginative and visually stunning images through DALL-E AI
            and share them with the community
          </p>{" "} */}
          <p className="mt-2 text-white/90 text-sm  ">
            Create imaginative and visually stunning images through DALL-E AI
            and share them with the community
          </p>
        </div>
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              // labelName="Your Name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="What do you want to see?"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="relative bg-black/10 border	 border-[#424549] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center ">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40 invert"
                />
              )}
              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-black/50 rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              // className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 w-full sm:w-auto  text-slate-400 transition-colors"
            >
              {generatingImg ? (
                <p className="flex items-center justify-center gap-1">
                  <ButtonLoader /> Generating
                </p>
              ) : (
                "Generate"
              )}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-white/80 text-sm">
              Once you have created the image you want, you can share it with
              others in the community.
            </p>
            <button
              type="submit"
              // className="mt-3 text-white bg-blue-600  font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              className="mt-3 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 w-full sm:w-auto font-medium text-slate-400 transition-colors"
            >
              {loading ? (
                <p className="flex items-center justify-center gap-1">
                  <ButtonLoader /> Sharing
                </p>
              ) : (
                "Share with the community"
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreatePost;