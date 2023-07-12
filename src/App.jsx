import { useState, useEffect } from 'react'
import './App.css'
import jsonData from '../data.json';


function App() {
  const [data, setData] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  useEffect(() => {
      setData(jsonData)

  }, []);

  const checkJobsForFilterTags = (tagsToFilter) => {

    // console.log({tagsToFilter})
    data.forEach(item => {
        let jobVisible = "true";
        let filterableTags = []
        filterableTags.push(item.role);
        filterableTags.push(item.level);

        item.languages.forEach(language => {
            filterableTags.push(language);
        })

        item.tools.forEach(tool => {
            filterableTags.push(tool);
        })

        tagsToFilter.forEach((element) => {
            if (!filterableTags.some( (filterableTag) => filterableTag == element.tag)) {
                jobVisible = "false";
            }
        })

        item.visible = jobVisible;
    })
    setData([...data])
  }


  const addFilterTag = ( tagName) => {
      if (filterTags.some( (element) => element.tag === tagName)) {
          // console.log('duplicate entry')
          return;
      }

      const newFilterTag = { id: filterTags.length, tag: tagName };
      setFilterTags([...filterTags, newFilterTag]);
      checkJobsForFilterTags([...filterTags, newFilterTag]);
  }

  const removeFilterTag = ( tagObject ) => {
    const newFilterTags = filterTags.filter(item => item.tag != tagObject.tag);
    // console.log(newFilterTags)
    setFilterTags([...newFilterTags]);
    checkJobsForFilterTags([...newFilterTags]);

  }

  const clearFilter = () => {
    setFilterTags([]);
    data.forEach(item => {
        item.visible = "true";
    })
    setData([...data]);
  }

  const selectJob = (job) => {


    // console.log('job.selected:  ', job.selected);
    // let updateSelected = job.selected ? "false" : "true";
    let updateSelected
    if (job.selected == "true") {
        updateSelected = "false";
    } else if (job.selected == "false") {
        updateSelected = "true";
    } else {
        updateSelected = "true";
        // console.log('Job.selected error');
    }

    data.forEach(item => {
      if (item.id === job.id) {
        item.selected = updateSelected;
        // console.log({item});
      }

    })
    setData([...data]);

  }


  return (
    <>
      <header>

      </header>
      <main>
        <div className="filters-container flex-container" data-visible={filterTags.length}>
          <div className="filter-tags__container flex-container">
          {filterTags.map(object => (
            <div key={object.id} className="filter-tag flex-container">

              <div className="filter-tag__text">{object.tag}</div>
              <div className="filter-tag__icon-delete active"
                onClick={() => removeFilterTag(object) }>
              </div>
            </div>
          ))}
          </div>
            <div className="filters-clear active"
              onClick={() => clearFilter()}
            >Clear</div>
        </div>
          
        {data.map(item => (
            
          (item.visible === "false" ? "false" : "true" ),
          (item.selected === "true" ? "true" : "false"),

          <div key={item.id} className="job-card grid-container" 
          data-visible={item.visible} data-selected={item.selected}>
            <div className="logo">
                <img src={ item.logo }></img>
            </div>

            <div className="primary-container">
              <div className="primary__row-1 flex-container">
                <div className="company-name">
                  { item.company }
                </div>

                { item.new ? 
                  <div className="new bubble-tag">NEW!</div> : ""
                }
        

                { item.featured ? 
                  <div className="featured bubble-tag">FEATURED!</div>
                  : "" 
                }
              </div>
              <div className="job-position active"
                onClick={() => selectJob(item)}>
                { item.position }
              </div>

              <div className="primary__row-3 flex-container">
                <div className="posted-at">
                    { item.postedAt}    
                </div>

                <div className="dot-divider"></div>

                <div className="contract">
                    { item.contract }
                </div>

              <div className="dot-divider"></div>

                <div className="location">
                    { item.location }
                </div>
              </div>
            </div>

            <hr></hr>

            <div className="tags-container flex-container">
                        
              <div className="tag active"
                  onClick={() => addFilterTag(item.role)}
              >
                  { item.role }
              </div>
                    
              <div className="tag active"
                  onClick={() => addFilterTag(item.level)}
              >
                  { item.level }
              </div>

              {item.languages.map((language, i) => (

                {},

                <div key={item.id + i} className="tag active"
                    onClick={() => addFilterTag( language)}
                >
                    { language }
                </div>
              ))}

              {item.tools.map((tool, i )=> (
                <div key={item.id + i} className="tag active"
                  onClick={() => addFilterTag(tool)}
                >
                  { tool }
                </div>
              ))}
            </div>

          </div>
        ))}

      </main>
    </>
    
  )


  
}

export default App
