import React, { useState } from 'react';

import './App.css';
import './styles.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Dropdown } from 'primereact/dropdown';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ScrollPanel } from 'primereact/scrollpanel';

const verbs = [
  { label: 'GET', value: 'GET', color: '#2980b9' },
  { label: 'POST', value: 'POST', color: '#16a085' },
  { label: 'PUT', value: 'PUT', color: '#e67e22' },
  { label: 'DELETE', value: 'DELETE', color: '#c0392b' },
];



function App() {
  const [url, setUrl] = useState("")
  const [verb, setVerb] = useState("");
  const [message, setMessage] = useState("http://localhost:3336/infornota/estados");

  const verbOptionTemplate = (option: any) => {
    return (
      <div style={{ color: option.color, fontWeight: 'bold' }}>{option.label}</div>
    );
  }

  return (
    <div style={{ overflowY: 'hidden', height: '100vh' }} className="App">
      <Splitter  style={{height: '100%' }} >
        <SplitterPanel size={30} minSize={20}>
          Panel 1
        </SplitterPanel>
        <SplitterPanel size={70}>
          <Splitter gutterSize={0} layout="vertical">
            <SplitterPanel size={80}>
              <div style={{height:'100%',borderBottom: '1px solid black', display: 'flex', flexDirection: 'row' }}>
                <Dropdown className="dropdown-verb" style={{ outline: 'none', height: '100%' }} itemTemplate={verbOptionTemplate} optionLabel="value" optionValue="value" value={verb} options={verbs} onChange={(e) => setVerb(e.value)} />
                <input className="input-verb" onChange={(e) => setUrl(e.currentTarget.value)}></input>
                {/* <InputText value={url} onChange={(e) => setUrl(e.currentTarget.value)} /> */}
                <button className="button-verb " onClick={(e) => {
                  e.preventDefault()
                  console.log('ok')
                  fetch(`${url}`, { method: verb })
                    .then(response => response.text())
                    .then(texto => {
                      console.log(texto)
                      const element = document.getElementById("custom")
                      const pre = document.getElementsByTagName('pre')
                      for(var i =0 ;i<pre.length;i++){
                        element!.removeChild(pre[i])
                      }
                      element!.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(JSON.stringify(JSON.parse(texto), undefined, 4));
                    })
                    .catch(err => {
                      setMessage(JSON.stringify({ Message: err.message }))
                      document.getElementById("pre")
                    })

                  function syntaxHighlight(json: string) {
                    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: any) {
                      var cls = 'number';
                      if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                          cls = 'key';
                        } else {
                          cls = 'string';
                        }
                      } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                      } else if (/null/.test(match)) {
                        cls = 'null';
                      }
                      return '<span class="' + cls + '">' + match + '</span>';
                    });
                  }
                }} >Enviar</button>
              </div>
            </SplitterPanel>
            <SplitterPanel size={20}>
              <Splitter>
                <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={50}>
                  <textarea></textarea>
                </SplitterPanel>
                <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={50}>
                  <ScrollPanel style={{ color: 'green', width: '100%', height: '90vh' }} className="custom" >
                    <div id="custom"></div>
                  </ScrollPanel>
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>

    </div>
  );
}

export default App;
