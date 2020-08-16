class Camera
{
	constructor( player,gfx,tilemap )
	{
		this.player = player
		this.gfx = gfx
		this.tilemap = tilemap
	}
	
	Draw( x,y,col )
	{
		const drawX = ( x - this.player.x + 1 )
		const drawY = ( y - this.player.y + 1 )
		if( drawX >= 0 && drawX < 3 &&
			drawY >= 0 && drawY < 3 )
		{
			this.gfx.DrawRect( drawX * this.tilemap.tileSize,drawY * this.tilemap.tileSize,
				this.tilemap.tileSize,this.tilemap.tileSize,col )
		}
		
		this.tilemap.DrawTile( x,y,col,this.gfx )
	}
	
	DrawSpr( x,y,spr,col,offset )
	{
		const drawX = ( x - this.player.x + 1 )
		const drawY = ( y - this.player.y + 1 )
		if( drawX >= 0 && drawX < 3 &&
			drawY >= 0 && drawY < 3 )
		{
			// this.gfx.DrawRect( drawX * this.tilemap.tileSize,drawY * this.tilemap.tileSize,
			// 	this.tilemap.tileSize,this.tilemap.tileSize,col )
			
			let xOffset = 0
			let yOffset = 0
			if( offset )
			{
				xOffset = offset.x
				yOffset = offset.y
			}
			this.gfx.DrawSprite( drawX * this.tilemap.tileSize + xOffset,
				drawY * this.tilemap.tileSize + yOffset,
				spr )
		}
		
		this.tilemap.DrawTile( x,y,col,this.gfx )
	}
}