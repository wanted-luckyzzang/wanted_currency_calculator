const Grid = (props) => {
    
    return <form onSubmit={props.onSubmit} style={{display:'flex', flexDirection:'column', padding:'20px', width:'500px', justifyContent: 'center', alignItems: 'center'}}>{props.children}</form>    
}

export default Grid;