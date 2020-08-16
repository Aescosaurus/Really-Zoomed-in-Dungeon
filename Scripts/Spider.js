class Spider extends Monster
{
	constructor( tilemap )
	{
		super( tilemap,Spider.sprs )
		this.hp = 1
	}
}

Spider.sprs =
[
	new Sprite( "Images/Spider0" ),
	new Sprite( "Images/Spider1" ),
	new Sprite( "Images/Spider2" ),
	new Sprite( "Images/Spider3" )
]