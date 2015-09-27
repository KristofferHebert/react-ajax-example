// http://jsbin.com/xovifofaru/edit?css,js,console,output

const FruitContainer = React.createClass({
    getInitialState(){
        return {
            fruits: []
        }
    },
    componentDidMount(){
        let request = new XMLHttpRequest()
        let self = this

        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                let fruits = JSON.parse(request.responseText)
                if(self.isMounted()){
                    self.setState({fruits: fruits})
                }
            }
        }

        request.open("GET", this.props.data)
        request.send(null)

    },
    render(){
        return (
            <div>
                <FruitList fruits={this.state.fruits}/>
            </div>
        )
    }
})


const FruitList = React.createClass({
    render(){
        let fruits = this.props.fruits.map((fruit, index) =>{
            return <Fruit fruit={fruit} key={index}/>
        })
        return(
            <div>
            <h3>List of Fruit Vendors</h3>
            <ul>
                {fruits}
            </ul>
            </div>
        )
    }
})

const Fruit = React.createClass({
    render(){
        let {farm_name, phone1, key} = this.props.fruit
        return(
            <li id={key}>
                Name: {farm_name} <br />
                Phone: {phone1} <br />
            </li>
        )
    }
})

React.render(<FruitContainer data="https://data.ct.gov/resource/hma6-9xbg.json?category=Fruit&item=Peaches&$limit=10" />, document.getElementById('app'))
