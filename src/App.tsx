import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';
import './styles.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ScrollPanel } from 'primereact/scrollpanel';

const verbs = [
  { label: 'get', value: 'GET' },
  { label: 'post', value: 'POST' },
  { label: 'put', value: 'PUT' },
  { label: 'delete', value: 'DELETE' },
];

function App() {
  const [url, setUrl] = useState("")
  const [verb, setVerb] = useState("");
  const [message, setMessage] = useState("http://localhost:3336/infornota/estados");

  return (
    <div style={{ overflowY: 'hidden',height: '100vh'}} className="App">
      <Splitter >
        <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={20} minSize={10}>
          Panel 1
    </SplitterPanel>
        <SplitterPanel size={80}>
          <Splitter layout="vertical">
            <SplitterPanel  style={{height:'10vh', flexDirection: 'row', justifyContent: 'space-between' }} className="p-d-flex p-ai-center  p-jc-between" size={15}>
              <Dropdown optionLabel="label" optionValue="value" value={verbs} options={verbs} onChange={(e) => setVerb(e.value)} placeholder="Select a Verb Http" />
              <InputText value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
              <Button label="Click" onClick={(e) => {
                e.preventDefault()
                fetch(`${url}`, { method: verb })
                  .then(response => response.text())
                  .then(texto => {
                    const element = document.getElementById("custom")
                    element!.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(JSON.stringify(JSON.parse(texto), undefined, 4));
                  })
                  .catch(err => {

                    setMessage(JSON.stringify({Message:err.message}))
                    document.getElementById("pre")
                  })

                  function syntaxHighlight(json:string) {
                    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match:any) {
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
              }} />
            </SplitterPanel>
            <SplitterPanel size={85}>
              <Splitter>
                <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={80}>
                  Panel 3
                    </SplitterPanel>
                <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={80}>
                  <ScrollPanel style={{color: 'green',width: '100%', height: '90vh'}} className="custom" >
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
