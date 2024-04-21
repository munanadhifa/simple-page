import React, { useState } from "react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/20/solid";

function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    skills: [],
    newSkills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkills = () => {
    if (formData.newSkill.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, prevFormData.newSkill],
        newSkill: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/submit-form",
        formData,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "form.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-x1 mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4">Application Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="name"
              className="block text-md font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Name
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:max-w-s  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="email"
              className="block text-md font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Email
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:max-w-s  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="name"
              className="block text-md font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Title
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:max-w-s  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="name"
              className="block text-md font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Description
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:max-w-s  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="skills"
              className="block text-md font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Skills
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0 flex">
              <input
                type="text"
                id="skills"
                name="newSkill"
                value={formData.newSkill}
                onChange={handleChange}
                placeholder="Enter a Skill"
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:max-w-s  sm:text-sm sm:leading-6"
              />

              <button
                type="button"
                onClick={handleSkills}
                className=" ml-4 rounded bg-sky-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-col ml-[34%] mt-0">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="relative max-w-xs sm:max-w-sm px-4 py-2 mb-4 bg-white border rounded-md shadow-sm"
                style={{ top: `${index * -25}px` }}
              >
                {skill}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className=" bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            Submit and Download PDF
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormComponent;
