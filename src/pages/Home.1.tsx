import { IonIcon, IonInput, IonCol, IonRow, IonGrid, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Component } from 'react';
import { Tensor3D } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import './Home.css';
import { send, airplane, mic } from 'ionicons/icons';
import { CameraPreview, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
export class Home extends Component {
  state: any = {};
  props: any = {};
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  product: any = null;
  ask: any = null;
  response: any = null;
  model: any = null;
  objectDetected: boolean = false;
  prodcutData: any = null;

  resetValues = () => {
    this.product = null;
    this.ask = null;
    this.response = null;
    this.objectDetected = false;
    //this.prodcutData=null;
  };

  async startCamera() {
    await TextToSpeech.speak({
      text: "cameraPreview started",
      lang: 'en-US',
      rate: 1,
      pitch: 1,
      volume: 1,
    })
    this.resetValues();
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100,
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    const base64PictureData = result.value;
    const dataUrl = 'data:image/jpeg;base64,' + base64PictureData;
    const img = new Image();
    img.onload = () => {
      this.cameraDetectObjects(img);
    };
    img.src = dataUrl;
  };

  stopCamera() {
    this.resetValues();
    // Logic for stopping the camera
  };

  async startListen() {
    this.ask = null;
    const hasPermission = await SpeechRecognition.checkPermissions();
    if (hasPermission && hasPermission.speechRecognition === 'granted') {
      SpeechRecognition.start({
        language: "en-US",
        maxResults: 1,
        prompt: "Ask Any Question about " + this.product,
        partialResults: true,
        popup: false,
      })
      interface PartialResultsData {
        matches: string[];
      }
      SpeechRecognition.addListener("partialResults", (data: PartialResultsData) => {
        //console.log("partialResults was fired", data.matches);
        this.ask = data.matches.join(' '); // Joining the array elements into a single string
       // alert(this.ask)
        this.formResponse();
      });
    }
  };

  stopListen() {
    this.ask = null;
    // Logic for stopping listening
  };

  async startSpeak() {
    if (this.isEmpty(this.response)) {
      await TextToSpeech.speak({
        text: this.response,
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        volume: 1,
      });
      //this.stopSpeak();
     // this.stopListen();
    }
  };

  stopSpeak() {
    // Logic for stopping speaking
  };

  async formResponse() {
    if (this.isEmpty(this.prodcutData)) {
      const fileresponse = await fetch('productData.json');
      this.prodcutData = await fileresponse.json();
    }

    if (!this.isEmpty(this.product) && !this.isEmpty(this.ask)) {
      let productObject = this.getValueByKey(this.prodcutData, this.product);
      if (!this.isEmpty(productObject)) {
        let qa: [] = this.getValueByKey(productObject, "QA");
        for (let i = 0; i < qa.length; i++) {
          let qaObject: any = qa[i];
          let questions: [] = this.getValueByKey(qaObject, "QUESTIONS");
          let ismatched = this.isAlmostMatching(this.ask, questions);
          if (ismatched) {
            this.response = this.getValueByKey(qaObject, "ANSWER");
            this.startSpeak();
          }
        }
      } else {
        this.response = 'I am not aware of any information about ' + this.product
        this.startSpeak();
      }
    }
  }

  levenshteinDistance(s1: string, s2: string): any {
    if (s1.length < s2.length) {
      return this.levenshteinDistance(s2, s1);
    }

    if (s2.length === 0) {
      return s1.length;
    }

    let previousRow = Array.from({ length: s2.length + 1 }, (_, i) => i);
    for (let i = 0; i < s1.length; i++) {
      let currentRow = [i + 1];
      for (let j = 0; j < s2.length; j++) {
        let insertions = previousRow[j + 1] + 1;
        let deletions = currentRow[j] + 1;
        let substitutions = previousRow[j] + (s1[i] !== s2[j] ? 1 : 0);
        currentRow.push(Math.min(insertions, deletions, substitutions));
      }
      previousRow = currentRow;
    }

    return previousRow[s2.length];
  }

  isAlmostMatching(question: string, listOfQuestions: Array<string>, threshold = 3) {
    console.log(listOfQuestions)
    console.log(question)
    for (let q of listOfQuestions) {
      let distance = this.levenshteinDistance(question.toLowerCase(), q.toLowerCase());
      console.log(distance)
      if (distance <= threshold) {
        return true;
      }
    }
    return false;
  }

  isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true;
    }

    return false;
  };

  getValueByKey(data: any, key: string) {
    if (data && key in data) {
      return data[key];
    }
    return null;
  };


  async cameraDetectObjects(imageElement: HTMLImageElement | Tensor3D | ImageData | HTMLCanvasElement | HTMLVideoElement) {
    if (this.isEmpty(this.model)) {
      this.model = await cocoSsd.load();
    }
    const imageTensor = tf.browser.fromPixels(imageElement);
    const predictions = await this.model.detect(imageTensor);
    if (predictions.length > 0) {
      this.product = predictions[0]['class'];
      // alert(this.product)
      this.objectDetected = true;
      this.startListen();
    }
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////

  async detectObjects(imageElement: HTMLImageElement | Tensor3D | ImageData | HTMLCanvasElement | HTMLVideoElement) {
    const model = await cocoSsd.load();
    // Convert the Image element to a tensor

    const imageTensor = tf.browser.fromPixels(imageElement);
    // Detect objects in the image tensor
    const predictions = await model.detect(imageTensor);
    if (predictions.length > 0) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = predictions[0]['class'];
      const parentDiv = document.getElementById('parentDiv');
      parentDiv.appendChild(paragraphElement);
      await TextToSpeech.speak({
        text: predictions[0]['class'],
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        volume: 1,
      })
 
    } else {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = "Not able detect.Try again";
      const parentDiv = document.getElementById('parentDiv');
      parentDiv.appendChild(paragraphElement);
      await TextToSpeech.speak({
        text: "Not able detect Try again",
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        volume: 1,
      })

    }

    console.log(predictions);
  }
  async takePicture() {
    await TextToSpeech.speak({
      text: "pic",
      lang: 'en-US',
      rate: 1,
      pitch: 1,
      volume: 1,
    })
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    const base64PictureData = result.value;
    const dataUrl = 'data:image/jpeg;base64,' + base64PictureData;
    const img = new Image();
    img.onload = () => {
      this.detectObjects(img);
    };
    img.src = dataUrl;
  }
  async startspeech() {
    const hasPermission = await SpeechRecognition.checkPermissions();
    if (hasPermission && hasPermission.speechRecognition === 'granted') {
      SpeechRecognition.start({
        language: "en-US",
        maxResults: 1,
        prompt: "Say something",
        partialResults: true,
        popup: false,
      })
      interface PartialResultsData {
        matches: string[];
      }
      SpeechRecognition.addListener("partialResults", (data: PartialResultsData) => {
        //console.log("partialResults was fired", data.matches);
        const transcription = data.matches.join(' '); // Joining the array elements into a single string
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = transcription;
        const parentDiv = document.getElementById('parentDiv');
        parentDiv.appendChild(paragraphElement);
      });
    }
  }
  async start() {

    var parentElement = document.getElementById('cameraPreview');

    // Calculate height and width based on device size
    var height = window.innerHeight - 60 - 100; // Subtracting any additional space
    var width = parentElement.offsetWidth - 5;

    CameraPreview.start({

      parent: 'cameraPreview', // Specify the parent element's ID
      height: height,
      width: width,
      paddingBottom: 200,
      enableZoom: true,
      x: 30,
      y: 70
    });
    await TextToSpeech.speak({
      text: "cameraPreview started",
      lang: 'en-US',
      rate: 1,
      pitch: 1,
      volume: 1,
    })
  };
  async stop() {
    CameraPreview.stop();
    //SpeechRecognition.stop();
    TextToSpeech.stop();
    await TextToSpeech.speak({
      text: "cameraPreview stoped",
      lang: 'en-US',
      rate: 1,
      pitch: 1,
      volume: 1,
    })
  };
  render() {
    const { photo } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar class='navbar'>
            <IonTitle class='title'>ENQUIRY</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid class="custom-grid" >
            <IonRow>
              <IonCol size="12">
                {/* Your camera preview will be displayed here */}
                <div id="cameraPreview"></div>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid class="custom-grid1">
            <div id="parentDiv">
              <p id="transcription">Enquir IT</p>

            </div>
          </IonGrid> <IonGrid>
            <IonInput fill="outline" color="success" placeholder="Type something..."> <IonIcon size="large" slot="end" icon={airplane}></IonIcon>
            </IonInput>

          </IonGrid>
          <IonCard className="icard">
            <IonButton className="custom-button0" color="success" shape="round" onClick={() => this.startspeech()}><IonIcon size="large" slot="start" icon={mic}></IonIcon> </IonButton>

            <IonButton className="custom-button1" color="success" shape="round" onClick={() => this.start()}>Start</IonButton>
            { /*<IonButton class="custom-button" fill="outline" shape="round"  onClick={() => this.stop()}>Speak Stop</IonButton>*/}
            {/*<IonButton class="custom-button" fill="outline" shape="round"  onClick={() => this.startListening()}>Start Listening</IonButton>*/}
            <IonButton className="custom-button2" color="dark" shape="round" onClick={() => this.takePicture()}>PIC</IonButton>
            <IonButton className="custom-button3" color="danger" shape="round" onClick={() => this.stop()}>Stop</IonButton>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
}
export default Home;
