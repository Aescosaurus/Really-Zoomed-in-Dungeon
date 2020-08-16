class BossBig extends Monster
{
	constructor( tilemap )
	{
		super( tilemap,
		[
			new Sprite( "Images/BossBig0" ),
			new Sprite( "Images/BossBig1" ),
			new Sprite( "Images/BossBig2" ),
			new Sprite( "Images/BossBig3" ),
		] )
		this.hp = 13
		this.boss = true
		
		this.x = tilemap.bossPos.x
		this.y = tilemap.bossPos.y
	}
	
	GenerateItem( player,curLevel )
	{
		return( BossBig.items[player.myClass][Random.Range( 0,BossBig.items[player.myClass].length - 1 )] )
	}
}

BossBig.items =
[
	[
		new Item( 0,3,5,new Sprite( "Images/Sword2" ) )
	],
	[
		new Item( 0,2.5,5,new Sprite( "Images/Staff2" ) )
	],
	[
		new Item( 0,1.8,5,new Sprite( "Images/Dagger2" ) )
	]
]