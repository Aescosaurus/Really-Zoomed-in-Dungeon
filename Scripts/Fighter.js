class Fighter extends Monster
{
	constructor( tilemap )
	{
		super( tilemap,Fighter.sprs )
		this.hp = 3
		this.damage = 2
	}
}

Fighter.sprs =
[
	new Sprite( "Images/Fighter0" ),
	new Sprite( "Images/Fighter1" ),
	new Sprite( "Images/Fighter2" ),
	new Sprite( "Images/Fighter3" )
]