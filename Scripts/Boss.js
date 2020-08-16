class Boss extends Monster
{
	constructor( tilemap )
	{
		super( tilemap,
		[
			new Sprite( "Images/Boss0" ),
			new Sprite( "Images/Boss1" ),
			new Sprite( "Images/Boss2" ),
			new Sprite( "Images/Boss3" ),
		] )
		this.hp = 5
		this.boss = true
		
		this.x = tilemap.bossPos.x
		this.y = tilemap.bossPos.y
	}
	
	GenerateItem( player,curLevel )
	{
		return( Boss.items[player.myClass][Random.Range( 0,Boss.items[player.myClass].length - 1 )] )
	}
}

Boss.items =
[
	[
		new Item( 0,2,5,new Sprite( "Images/Sword1" ) )
	],
	[
		new Item( 0,1.4,5,new Sprite( "Images/Staff1" ) )
	],
	[
		new Item( 0,0.8,5,new Sprite( "Images/Dagger1" ) )
	]
]