class Bug extends Monster
{
	constructor( tilemap )
	{
		super( tilemap,Bug.sprs )
		this.hp = 2
		this.damage = Random.Range( 1,2 )
	}
}

Bug.sprs =
[
	new Sprite( "Images/Bug0" ),
	new Sprite( "Images/Bug1" ),
	new Sprite( "Images/Bug2" ),
	new Sprite( "Images/Bug3" )
]