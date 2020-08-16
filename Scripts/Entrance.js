class Entrance
{
	constructor( x,y )
	{
		this.x = x
		this.y = y
	}
	
	Draw( cam )
	{
		cam.DrawSpr( this.x,this.y,Entrance.spr,"#382400" )
	}
}

Entrance.spr = new Sprite( "Images/Entrance" )