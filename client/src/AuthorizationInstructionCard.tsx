export interface AuthInstructionCardProps {
  isAuthorized: boolean;
  isAuthenticated: boolean;
  updateAttempted: boolean;
}

const AuthorizationInstructionCard = (props: AuthInstructionCardProps) => {
  const tryUpdateDescription = `Now try adding or deleting an item from the list. If you haven't yet configured authorization, this should fail.`;

  const noAccessDescription = `Not so fast! We haven't setup your permission to be able to write to the list yet. For that, 
  you'll need the "contributor" role which is defined in your staticwebapp.config.json file.  You can also view and update the role definition
  via the "Routes" feature in the Azure Portal.  Here's how to give yourself "contributor" role access:`;

  const userInfoUrl = `${window.location.origin}/.auth/me`;

  if (props.isAuthenticated) {
    if (!props.updateAttempted) {
      return <section className="card">
        <div className="card-body">
          <h5 className="card-title">Great you're logged in!</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{tryUpdateDescription}</h6>
        </div>
      </section>
    } else if(!props.isAuthorized) {
      return <section className="card">
        <div className="card-body">
          <h5 className="card-title">How to configure authorization</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{noAccessDescription}</h6>
          <ol>
            <li>Click <a href={userInfoUrl} target="_blank" rel="noreferrer">here</a> to confirm that you're currently not assigned the "contributor" user role under the userRoles property.</li>
            <li>Login to <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a> and find the repository under your account hosting this app</li>
            <li>Open the file under /server/app.js</li>
            <li>Click on the little pen icon on the top-right to edit the file.</li>
            <li>Uncomment the code within the getRoles function and replace 'yourGoogleAlias' with your own</li>
            <li>Commit your changes and wait for them to build and deploy</li>
            <li>Logout and refresh the page, then retry to update the list. If everything went well, it should work now.</li>
          </ol>
          <a href="https://go.microsoft.com/fwlink/?linkid=2272184" className="card-link" target="_blank" rel="noreferrer">Learn more</a>
        </div>
      </section>
    }
  }

  return <></>
}

export default AuthorizationInstructionCard;
