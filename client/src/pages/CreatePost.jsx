import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm(
          { ...form, photo: `data:image/png;base64, ${ data.photo }`
          }
        );
      } catch (error) {
          alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
        alert('Please enter a prompt');
    }
  }

  const handleSubmit  = () => {

  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative and visually stunning images through DALL-E AI and share them with the community!
        </p>
      </div>

      <form 
        className="mt-16 max-w-3xl" 
        onSubmit={ handleSubmit }>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Enter Name..."
            value={ form.name }
            handleChange={ handleChange }
            // isSurpriseMe={ false }
            // handleSurpriseMe={ false }
          />
          <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={ form.prompt }
            handleChange={ handleChange }
            isSurpriseMe
            handleSurpriseMe={ handleSurpriseMe }
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={ form.photo }
                alt={ form.prompt }
                className="object-contain w-full h-full"
              />
            ) : (
              <img
                src={ preview }
                alt="Preview"
                className="object-contain w-9/12 h-9/12 opacity-40"
              />
            )}

            { generatingImg && (
              <div className="absolute inset-0 z-0 bg-[rgba(0, 0, 0, 0.5)] rounded-lg flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={ generateImage }
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            { generatingImg ? 'Generating...' : 'Generate' }
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666E75] text-[14px]">
            Once you have created the perfect image, be sure to share it with the community by clicking the button below!
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469FF] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            { loading ? 'Loading...' : 'Share with the community' }
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost