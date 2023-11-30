import { preview } from '../assets'
import { getRandomPromt } from '../utils'
import { FormField, Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CreatePost = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const [loading, setLoading] = useState(false);

const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8000/api/v1/dalle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
        });  
        const data = await response.json();
        setForm({ ...form, photo: `${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (form.prompt && form.photo) { 
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form}),
        });

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
       }

    } else {
      alert('Please provide proper prompt and generate a image');
    }
  }

  const handleChange = async (e) => { 
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = async () => { 
    const randomPrompt = getRandomPromt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  }


  return (
    <section className='max-w-4xl mx-auto'>
      <div>
        <h1 className=" font-extrabold text-[#222328] text-2xl">Create</h1>
        <p className="mt-2 text-slate-500 text-md max-w-[500px]">
          Create imaginative and visually stunning imagenes through DALLE-E and shaere them
        </p>
      </div>
      <form className=' mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='Enter your name'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName='enter a prompt or'
            type='text'
            name='prompt'
            placeholder='Aplush toy robot sitting against a yellow wall'
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-3 h-72 flex justify-center items-center'>
            {
              form.photo ? (
                <img 
                  src={form.photo}
                  alt={form.prompt}
                  className='w-full h-full object-contain'
                />
              ) : (
                  <img 
                    src={preview}
                    alt='preview'
                    className='w-9/12 h-9/12 object-contain opacity-40'
                  />
              )
            }
            {
              generatingImg && (
                <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                  <Loader />
                </div>
              )
            }
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImg}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {
              generatingImg ? 'Generating...' : 'Generate Image'
            }
            </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#4649ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost