import './App.css';
import { useEffect, useState } from 'react';
import { Meme } from "./components/Meme";
import { Fragment } from 'react';
import GoTopButton from './components/GoTopButton';
import { Content, Heading } from './components/ButtonStyles';


const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [meme, setMeme] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoaded] = useState(false);
  
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
    .then(x => x.json()
    .then(
      (response) => {
      setTemplates(response.data.memes)
    },
    (error) => {
      setIsLoaded(true);
      setError(error);
        }
    )
    );
  
  }, []);

  if (meme) {
    return (
    <div>
      <img src={meme} alt="custom meme" />
    </div>
    
    );  
}
  
  return (
  <div className="App">
      <Fragment>
      <Heading>Meme Generator!</Heading> 
      <Content />
      <GoTopButton />
      </Fragment>
      {template && (
    <form onSubmit={async e => {
        e.preventDefault()
        const params = {
          template_id: template.id,
          text0: topText,
          text1: bottomText,
          username: 'UmeshJ',
          password: 'N4tEPa4weYmEUg5'

        };
        const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url);
          }}
        >
      <Meme template={template} /> 
      <input placeholder='Top text' 
      value={topText} 
      onChange={e => setTopText(e.target.value)} />
      <input placeholder='Bottom text' 
      value={bottomText} 
      onChange={e => setBottomText(e.target.value)}/>
      <button type="submit" >Create Meme</button>
      </form>
  )}
      
      {!template && 
      templates.map(template => {
        return (
          <Meme key={template.id}
          template={template}
          onClick={() => {
            setTemplate(template);
          }}
          onKeyDown={(event) => {
            if(event.code === 'Enter') {
              setTemplate(template)
            }
          }}
          />
        );
      })}
    <div className="buttonStyle">
      <button onClick={() => window.location.reload(false)}>Go Back</button>
    </div>

      <footer className="footerStyle">Built by Umesh - Juno 2023
      </footer>

  </div>
    
  );
}

export default App;
