class Game {
    constructor(){

    }

    /**
     * 
     * @param {What country to draw on the map} country 
     * @returns 
     */
    drawCountryOnMap(country){
        console.log(country)
        let lowestX = 200;
        let lowestY = 200;
        let highestX = -200;
        let highestY = -200;
        let pointsString = "";
        //Generate Scale Factor
        let aim = 500;
        //this gets us our lowest and highest point of our country
        for (let i = 0; i < country.coordinates[0].length; i++) {
            lowestX = lowestX > country.coordinates[0][i][0]? country.coordinates[0][i][0] : lowestX;
            lowestY = lowestY > country.coordinates[0][i][1]? country.coordinates[0][i][1] : lowestY;
            highestX = highestX < country.coordinates[0][i][0]? country.coordinates[0][i][0] : highestX;
            highestY = highestY < country.coordinates[0][i][1]? country.coordinates[0][i][1] : highestY;
        }
        //which is bigger x or y
        let longestSide = Math.abs(lowestX - highestX) > Math.abs(lowestY - highestY)? Math.abs(lowestX - highestX): Math.abs(lowestY - highestY);
        let scaleFactor = aim/longestSide;
        let offsetFactorX = lowestX < 0? abs(lowestX) : 0;
        let offsetFactorY = lowestY < 0? abs(lowestY) : 0;
        console.log(lowestX, lowestY, highestX, highestY)
        for (let i = 0; i < country.coordinates[0].length; i++){
            pointsString += (country.coordinates[0][i][0] - lowestX ) * scaleFactor  + ',';
            pointsString += (country.coordinates[0][i][1] - lowestY ) * scaleFactor + ',';
        }
        //remove trailing common
        pointsString = pointsString.slice(0, -1);
        this.addPolygonToMap(pointsString);
    }
    
    /**
     * Addes a polygon to the "MAP" SVG element on the main html page
     * @param {The points of the polygon to draw} points 
     */
    addPolygonToMap(points) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttributeNS(null, "points", points);
        polygon.style = "fill:lime;stroke:purple;stroke-width:1";
        let element = document.getElementById("Map");
        console.log(polygon);
        element.appendChild(polygon);
    }
}

function main() {
    //grab the data from countries data class
    this.data = new Countries().data;
    //let's seperate and clean the data
    this.countriesGeoData = {};
    this.countriesNames = [];
    for (let i = 0; i < this.data.features.length; i++) {
        this.countriesGeoData[this.data.features[i].properties.ADMIN] = this.data.features[i].geometry;
        this.countriesNames.push(this.data.features[i].properties.ADMIN);
    }
    this.game = new Game();
    this.game.drawCountryOnMap(this.countriesGeoData["Siachen Glacier"]);
}


main();