export default function Die(props) {
    return(
        <button 
            //conditional styling for button depending on if it is held or not
            style = {{backgroundColor: props.held ? "#59E391" : "white"}}
        >
            {props.value}
        </button>
    )

}