import { useEffect, useState } from "react";
import { Loader, Card, FormField } from "../components"

const RenderCards = ({data, title}) => {
    if (data?.length > 0) {
        return data.map((post) => <Card key={post._id} {...post} />)
    } 

    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
}

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState(null);
    const [serchTimeout, setSerchTimeout] = useState(null);

    useEffect(() => { 
        const fetchPosts = async () => { 
            setLoading(true);
            try {
                const response = await fetch('https://abdielotzoy-dalle-clone-mern.onrender.com/api/v1/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                if (response.ok) {
                    const result = await response.json();
                    setAllPosts(result.data.reverse());
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const handleSeachChange = (e) => { 
        clearTimeout(serchTimeout);
        setSearchText(e.target.value);

        setSerchTimeout(

            setTimeout(() => {
                const searchResults = allPosts.filter((post) => post.name.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase()));
    
                setSearchedResults(searchResults)
            }, 500)
        )
    }

  return (
    <section className="max-w-7xl mx-auto">
        <div>
              <h1 className=" font-extrabold text-[#222328] text-2xl">The Community Showcase</h1>
              <p className="mt-2 text-slate-500 text-md max-w-[500px]">
                  Browse through a collection of imaginative and visually stunning imagenes generated by DALLE-E
              </p>
          </div>
          <div className="mt-16">
              <FormField 
                  label="search posts"
                  type="text"
                  name="text"
                  placeholder="Search posts by name or prompt"
                  value={searchText}
                  handleChange={handleSeachChange}
              />
          </div>

          <div className="mt-10">
              {
                  loading ? (
                      <div className="flex justify-center items-center">
                            <Loader />
                      </div>
                  ) : (
                    <>
                        {
                            searchText && (
                                <h2 className="font-medium text-gray-500 text-xl mb-3">Showing results for
                                <span className="font-bold text-gray-700"> {searchText}</span>
                                </h2>
                            )      
                        }
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {
                                searchText ? (
                                    <RenderCards 
                                        data={searchedResults} 
                                        title='No search results found'
                                    />
                                ) : (
                                    <>
                                        <RenderCards    
                                            data={allPosts}
                                            title="No posts found" />
                                    </>
                                )          
                            }
                        </div>      
                                  
                    </>
                  )
              }
          </div>
    </section>
  )
}

export default Home