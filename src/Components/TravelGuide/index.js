import TravelPlaceList from '../TravelPlaceList'

import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
    state = {placesList: [], apiStatus: apiStatusConstants.initial}

    componentDidMount() {
        this.getTravelPlaces()
    }

    renderFormattedData = data => ({
        id: data.id,
        name: data.name,
        imageUrl: data.image_url,
        description: data.description,
    })

    getTravelPlaces = async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const apiUrl = 'https://apis.ccbp.in/tg/packages'
        const response = await fetch(apiUrl)
        if (response.ok === true) {
            const fetchedData = await response.json()
            const updatedList = fetchedData.package.map(eachPackage =>
                this.renderFormattedData(eachPackage),
                )
                console.log(updatedList)
                this.setStatus({
                    placesList: updatedList,
                    apiStatus: apiStatusConstants.success,
                }) 
    }
}

renderLoader = () => {
    <div data-testid="loader" className="position">
        <loader type="TailSpin" color="#00BFFF" height={50} width={50}/>

    </div>
}
renderPlacesView = () => {
    const {placesList.map(eachPlace =>(
        <TravelPlaceList eachPlace={eachPlace} key={eachPlace.id}/>
    ))}
    </ul>
}
}
renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
        case apiStatusConstants.success:
            return this.renderPlacesView()
            default:
                return null 
    }
}

render() {
    return (
        <div className="travel-guide-container">
            <h1 className="main-heading">Travel Guide</h1>
            <hr className="separator" />
            {this.renderViewBasedOnApiStatus()}
        </div>
    )
}
}
export default TravelGuide