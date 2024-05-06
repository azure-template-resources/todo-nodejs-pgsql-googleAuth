export interface AuthInstructionCardProps{
    isAuthenticated: boolean;
}

const AuthenticationInstructionCard = (props: AuthInstructionCardProps) => {

    if(!props.isAuthenticated){
        return <section className="card">
        <div className="card-body">
          <h5 className="card-title">Authentication</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">How to setup authentication with Google</h6>
          <ol>
            <li>Create or select an existing project in <a href="https://console.cloud.google.com/">Google Cloud</a></li>
            <li>Go to "APIs & Services" -&gt; "Credentials"</li>
            <li>Create a new OAuth Client ID credential for a Web Application</li>
            <li>Add an authorized origin: <span className='url'>{window.location.origin}</span></li>
            <li>Add an authorized redirect uri: <span className='url'>{window.location.origin}/.auth/login/google/callback</span></li>
            <li>Hit "Create" and copy the client ID and client secret.  NOTE: Make sure you keep these safe!</li>
            <li>Go to the Azure portal and paste your Google ClientId and ClientSecret in the Authentication settings for your front-end Static App.</li>
          </ol>
          <a href={window.location.origin} className="card-link" target="_blank" rel="noreferrer">Learn more</a>
        </div>
      </section>
    }

    return <></>
}

export default AuthenticationInstructionCard;