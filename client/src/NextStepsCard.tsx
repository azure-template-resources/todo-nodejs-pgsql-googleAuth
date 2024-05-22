export interface NextStepsInstructionCardProps{
    isAuthorized: boolean;
    isAuthenticated: boolean;
    updateAttempted: boolean;
}

const NextStepsInstructionCard = (props: NextStepsInstructionCardProps) => {

  const description = `Congratulations!  You have successfully deployed a 3-tier app and configured authentication 
  with authorization.  Here's some materials you may want to consider to continue your learning journey:`;

    if(props.isAuthorized && props.isAuthenticated && props.updateAttempted){
        return <section className="card">
        <div className="card-body">
          <h5 className="card-title">Success!</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{description}</h6>
          <ol>
          <li><a href='https://go.microsoft.com/fwlink/?linkid=2272184' target="_blank" rel="noreferrer">Learn about how the code in this application works</a></li>
            <li><a href='https://github.com/azure-template-resources/todo-nodejs-pgsql-googleAuth/blob/main/README.md' target="_blank" rel="noreferrer">How to run this app locally using the SWA CLI</a></li>
            <li><a href='https://learn.microsoft.com/en-us/azure/app-spaces/overview' target="_blank" rel="noreferrer">App Spaces documentation</a></li>
            <li><a href='https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#routes' target="_blank" rel="noreferrer">How routing works in Static Web Apps</a></li>
            <li><a href='https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization' target="_blank" rel="noreferrer">Authentication and authorization in Static Web Apps</a></li>
          </ol>
          <a href={window.location.origin} className="card-link">Learn more</a>
        </div>
      </section>
    }

    return <></>
}

export default NextStepsInstructionCard;