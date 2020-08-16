class Tilemap
{
	constructor( gfx )
	{
		this.tileSize = 16
		this.camWidth = 48 / this.tileSize
		this.camHeight = 48 / this.tileSize
		this.width = 64-48
		this.height = 48
		
		this.tiles = []
		
		this.playerPos = { x: 0,y: 0 }
		this.bossPos = { x: 0,y: 0 }
		
		this.tileSprs =
		[
			new Sprite( "Images/Floor" ),
			new Sprite( "Images/Wall" )
		]
		
		// this.Generate()
	}
	
	Draw( player,gfx )
	{
		for( let y = 0; y < this.camHeight; ++y )
		{
			for( let x = 0; x < this.camWidth; ++x )
			{
				// gfx.DrawRect( x * this.tileSize,y * this.tileSize,
				// 	this.tileSize,this.tileSize,
				// 	this.CalcTileCol( Math.floor( player.x ) + x - Math.floor( this.camWidth / 2 ),
				// 	Math.floor( player.y ) + y - Math.floor( this.camHeight / 2 ) ) )
				gfx.DrawSprite( x * this.tileSize,y * this.tileSize,
					this.GetTileSpr( Math.floor( player.x ) + x - Math.floor( this.camWidth / 2 ),
					Math.floor( player.y ) + y - Math.floor( this.camHeight / 2 ) ) )
			}
		}
	}
	
	DrawTilemap( gfx )
	{
		for( let y = 0; y < this.height; ++y )
		{
			for( let x = 0; x < this.width; ++x )
			{
				// gfx.DrawRect( x + 48,y,1,1,this.CalcTileCol( x,y ) )
				this.DrawTile( x,y,this.CalcTileCol( x,y ),gfx )
			}
		}
	}
	
	DrawTile( x,y,col,gfx )
	{
		gfx.DrawRect( x + 48,y,1,1,col )
	}
	
	Generate()
	{
		for( let y = 0; y < this.height; ++y )
		{
			for( let x = 0; x < this.width; ++x )
			{
				this.SetTile( x,y,1 )
			}
		}
		
		const roomCount = 8
		const roomWidth = new Range( 3,7 )
		const roomHeight = new Range( 3,7 )
		
		let curY = this.height - roomHeight.max - 1
		const rooms = []
		for( let i = 0; i < roomCount; ++i )
		{
			rooms.push( { left: 0,right: 0,top: 0,bot: 0 } )
			
			const curRoom = rooms[rooms.length - 1]
			const width = roomWidth.Rand()
			const height = roomHeight.Rand()
			
			curRoom.left = Random.Range( 1,this.width - width - 1 )
			curRoom.right = curRoom.left + width
			
			// curRoom.top = Random.Range( 0,this.height - height )
			curRoom.top = curY
			curY = curY - height - 1
			if( curY < 1 ) curY = 1
			curRoom.bot = curRoom.top + height
		}
		
		this.playerPos.x = Random.Range( rooms[0].left,rooms[0].right - 1 )
		this.playerPos.y = Random.Range( rooms[0].top,rooms[0].bot - 1 )
		this.bossPos.x = Random.Range( rooms[rooms.length - 1].left,rooms[rooms.length - 1].right - 1 )
		this.bossPos.y = Random.Range( rooms[rooms.length - 1].top,rooms[rooms.length - 1].bot - 1 )
		
		const corridors = []
		for( let i = 0; i < rooms.length - 1; ++i )
		{
			corridors.push( { startX: 0,startY: 0,endX: 0,endY: 0 } )
			const curCorridor = corridors[corridors.length - 1]
			const curRoom = rooms[i]
			const nextRoom = rooms[i + 1]
			
			curCorridor.startX = Random.Range( curRoom.left,curRoom.right - 1 )
			curCorridor.startY = Random.Range( curRoom.top,curRoom.bot - 1 )
			curCorridor.endX = Random.Range( nextRoom.left,nextRoom.right - 1 )
			curCorridor.endY = Random.Range( nextRoom.top,nextRoom.bot - 1 )
		}
		
		for( let i in rooms )
		{
			const curRoom = rooms[i]
			for( let y = curRoom.top; y < curRoom.bot; ++y )
			{
				for( let x = curRoom.left; x < curRoom.right; ++x )
				{
					this.SetTile( x,y,0 )
				}
			}
		}
		
		for( let i in corridors )
		{
			const curCorridor = corridors[i]
			let drawX = curCorridor.endX
			let drawY = curCorridor.startY
			if( curCorridor.startX > curCorridor.endX )
			{
				const temp = curCorridor.startX
				curCorridor.startX = curCorridor.endX
				curCorridor.endX = temp
			}
			if( curCorridor.startY > curCorridor.endY )
			{
				const temp = curCorridor.startY
				curCorridor.startY = curCorridor.endY
				curCorridor.endY = temp
			}
			// if( Random.Range( 0,100 ) < 50 )
			{
				for( let x = curCorridor.startX; x < curCorridor.endX; ++x )
				{
					this.SetTile( x,drawY,0 )
				}
				this.SetTile( curCorridor.endX,drawY,0 )
				for( let y = curCorridor.startY; y < curCorridor.endY; ++y )
				{
					this.SetTile( drawX,y,0 )
				}
			}
		}
	}
	
	GetRandTile()
	{
		let randX = 0
		let randY = 0
		do
		{
			randX = Random.Range( 1,this.width - 1 )
			randY = Random.Range( 1,this.height - 1 )
		}
		while( this.GetTile( randX,randY ) > 0 )
		
		return( { x: randX,y: randY } )
	}
	
	SetTile( x,y,tile )
	{
		this.tiles[y * this.width + x] = tile
	}
	
	GetTile( x,y )
	{
		if( x < 0 || x >= this.width ||
			y < 0 || y >= this.height ) return( 1 )
		return( this.tiles[y * this.width + x] )
	}
	
	CalcTileCol( x,y )
	{
		const tileCols =
		[
			"#FACACA",
			"#A1858D"
		]
		return( tileCols[this.GetTile( x,y )] )
	}
	
	GetTileSpr( x,y )
	{
		return( this.tileSprs[this.GetTile( x,y )] )
	}
}