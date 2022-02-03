

function Spinner(progress){
    if(progress!=100){
    return(
        
        <div ide="Loading">
            <style
            type="Oval"
            color="green"
            height={30}
            width={30}
            timeout={3000}
            />
            <p>좀만 기다려봐</p>
        </div>

    );
}
}

export default Spinner;