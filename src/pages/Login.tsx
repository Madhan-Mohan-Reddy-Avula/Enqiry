import React, { useState } from 'react';
import { IonButton, IonInput,IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const users = [
    { email: '20NA1A0501', password: '20NA1A0501' },
    { email: '20NA1A0502', password: '20NA1A0502' },
    { email: '20NA1A0503', password: '20NA1A0503' },
    { email: '20NA1A0504', password: '20NA1A0504' },
    { email: '20NA1A0505', password: '20NA1A0505' },
    { email: '20NA1A0506', password: '20NA1A0506' },
    { email: '20NA1A0507', password: '20NA1A0507' },
    { email: '20NA1A0508', password: '20NA1A0508' },
    { email: '20NA1A0509', password: '20NA1A0509' },
    { email: '20NA1A0510', password: '20NA1A0510' },
    { email: '20NA1A0511', password: '20NA1A0511' },
    { email: '20NA1A0512', password: '20NA1A0512' },
    { email: '20NA1A0513', password: '20NA1A0513' },
    { email: '20NA1A0514', password: '20NA1A0514' },
    { email: '20NA1A0515', password: '20NA1A0515' },
    { email: '20NA1A0516', password: '20NA1A0516' },
    { email: '20NA1A0517', password: '20NA1A0517' },
    { email: '20NA1A0518', password: '20NA1A0518' },
    { email: '20NA1A0519', password: '20NA1A0519' },
    { email: '20NA1A0520', password: '20NA1A0520' },
    { email: '20NA1A0521', password: '20NA1A0521' },
    { email: '20NA1A0522', password: '20NA1A0522' },
    { email: '20NA1A0523', password: '20NA1A0523' },
    { email: '20NA1A0524', password: '20NA1A0524' },
    { email: '20NA1A0525', password: '20NA1A0525' },
    { email: '20NA1A0526', password: '20NA1A0526' },
    { email: '20NA1A0527', password: '20NA1A0527' },
    { email: '20NA1A0528', password: '20NA1A0528' },
    { email: '20NA1A0529', password: '20NA1A0529' },
    { email: '20NA1A0530', password: '20NA1A0530' },
    { email: '20NA1A0531', password: '20NA1A0531' },
    { email: '20NA1A0532', password: '20NA1A0532' },
    { email: '20NA1A0533', password: '20NA1A0533' },
    { email: '20NA1A0534', password: '20NA1A0534' },
    { email: '20NA1A0535', password: '20NA1A0535' },
    { email: '20NA1A0536', password: '20NA1A0536' },
    { email: '20NA1A0537', password: '20NA1A0537' },
    { email: '20NA1A0538', password: '20NA1A0538' },
    { email: '20NA1A0539', password: '20NA1A0539' },
    { email: '20NA1A0540', password: '20NA1A0540' },
    { email: '20NA1A0541', password: '20NA1A0541' },
    { email: '20NA1A0542', password: '20NA1A0542' },
    { email: '20NA1A0543', password: '20NA1A0543' },
    { email: '20NA1A0544', password: '20NA1A0544' },
    { email: '20NA1A0545', password: '20NA1A0545' },
    { email: '20NA1A0547', password: '20NA1A0547' },
    { email: '20NA1A0548', password: '20NA1A0548' },
    { email: '20NA1A0549', password: '20NA1A0549' },
    { email: '20NA1A0550', password: '20NA1A0550' },
    { email: '20NA1A0551', password: '20NA1A0551' },
    { email: '20NA1A0552', password: '20NA1A0552' },
    { email: '20NA1A0553', password: '20NA1A0553' },
    { email: '20NA1A0554', password: '20NA1A0554' },
    { email: '20NA1A0555', password: '20NA1A0555' },
    { email: '20NA1A0556', password: '20NA1A0556' },
    { email: '20NA1A0557', password: '20NA1A0557' },
    { email: '20NA1A0558', password: '20NA1A0558' },
    { email: '20NA1A0559', password: '20NA1A0559' },
    { email: '20NA1A0560', password: '20NA1A0560' },
    { email: '20NA1A0561', password: '20NA1A0561' },
    { email: '20NA1A0562', password: '20NA1A0562' },
    { email: '20NA1A0563', password: '20NA1A0563' },
    { email: '20NA1A0564', password: '20NA1A0564' },
    { email: '20NA1A0565', password: '20NA1A0565' },
    { email: '20NA1A0566', password: '20NA1A0566' },
    { email: '20NA1A0567', password: '20NA1A0567' },
    { email: '20NA1A0568', password: '20NA1A0568' },
    { email: '20NA1A0569', password: '20NA1A0569' },
    { email: '20NA1A0570', password: '20NA1A0570' },
    { email: '20NA1A0571', password: '20NA1A0571' },
    { email: '20NA1A0572', password: '20NA1A0572' },
    { email: '20NA1A0573', password: '20NA1A0573' },
    { email: '20NA1A0574', password: '20NA1A0574' },
    { email: '20NA1A0575', password: '20NA1A0575' },
    { email: '20NA1A0576', password: '20NA1A0576' },
    { email: '20NA1A0577', password: '20NA1A0577' },
    { email: '20NA1A0578', password: '20NA1A0578' },
    { email: '20NA1A0579', password: '20NA1A0579' },
    { email: '20NA1A0580', password: '20NA1A0580' },
    { email: '20NA1A0581', password: '20NA1A0581' },
    { email: '20NA1A0582', password: '20NA1A0582' },
    { email: '20NA1A0583', password: '20NA1A0583' },
    { email: '20NA1A0584', password: '20NA1A0584' },
    { email: '20NA1A0585', password: '20NA1A0585' },
    { email: '20NA1A0586', password: '20NA1A0586' },
    { email: '20NA1A0587', password: '20NA1A0587' },
    { email: '20NA1A0588', password: '20NA1A0588' },
    { email: '20NA1A0589', password: '20NA1A0589' },
    { email: '20NA1A0590', password: '20NA1A0590' },
    { email: '20NA1A0591', password: '20NA1A0591' },
    { email: '20NA1A0592', password: '20NA1A0592' },
    { email: '20NA1A0593', password: '20NA1A0593' },
    { email: '20NA1A0594', password: '20NA1A0594' },
    { email: '20NA1A0595', password: '20NA1A0595' },
    { email: '20NA1A0596', password: '20NA1A0596' },
    { email: '20NA1A0597', password: '20NA1A0597' },
    { email: '20NA1A0598', password: '20NA1A0598' },
    { email: '20NA1A0599', password: '20NA1A0599' },
   
  ];
  const handleLogin = () => {
    // Dummy authentication
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      // Successful login, redirect to home page
      history.push('/home');
      TextToSpeech.speak({
        text:  "you are in Enquiry",
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        volume: 1, 
      })
    } else {
      // Invalid credentials, show error message or toast
      console.log('Invalid email or password');
      const passworderror = document.getElementById("passerror");
      passworderror.textContent = 'Invalid email or password';
      passworderror.style.color = "red";
    }
  };
  return (
    <div>
    <div class="logbutt">
      <IonInput class="logimput"
        type="email"
        color="success"
        value={email}
        clearInput={true}
        label="Username" 
        labelPlacement="floating" 
        fill="outline"
        aria-label="Success input"
        onIonChange={(e) => setEmail(e.detail.value!)}
      />
      <IonInput class="logimput"
        color="success"
        type="password"
        value={password}
        clearInput={true}
        label="Password" 
        labelPlacement="floating" 
        fill="outline"
        onIonChange={(e) => setPassword(e.detail.value!)}
      /></div>
      <div class="butt">
      <IonButton fill="outline" shape="round"  color="success" onClick={handleLogin}>Login</IonButton>
      <p id="passerror"></p></div>
    </div>
  );
};
export default Login;
