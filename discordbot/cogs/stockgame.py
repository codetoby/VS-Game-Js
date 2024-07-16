import discord
import requests
import json
from discord.ext import commands
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL')
BEARER_TOKEN = os.getenv("BEARER_TOKEN")

HEADERS = {
    "Authorization": f'Bearer {BEARER_TOKEN}'
}

class StockGame(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def createPortfolio(self, ctx):

        userid = ctx.author.id

        data = {
            "userId": userid,
        }

        response = requests.post(
            f'{BACKEND_URL}/portfolio', data=data, headers=HEADERS)

        success = json.loads(response.text)['success']

        if success:
            message = 'Du hast gerade ein neues Portfolio eröffnet'
            await ctx.send(message)
        else:
            message = 'Du hast schon ein Portfolio. Du kannst nicht erneut eins Öffnen'
            await ctx.send(message)

    @commands.command()
    async def buy(self, ctx, ticker: str, shares: int):

        userid = ctx.author.id

        data = {
            "userId": userid,
            "ticker": ticker,
            "shares": shares
        }

        response = requests.post(
            f'{BACKEND_URL}/order/buy', data=data, headers=HEADERS)

        message = json.loads(response.text)["message"]
        await ctx.send(message)

    @commands.command()
    async def sell(self, ctx, ticker: str, shares: int):

        userid = ctx.author.id

        data = {
            "userId": userid,
            "ticker": ticker,
            "shares": shares
        }

        response = requests.post(
            f'{BACKEND_URL}/order/sell', data=data, headers=HEADERS)

        message = json.loads(response.text)

        print(message)

        await ctx.send(message["message"])

    @commands.command()
    async def portfolio(self, ctx, j = None):

        userid = ctx.author.id

        response = requests.get(
            f'{BACKEND_URL}/portfolio/{userid}', headers=HEADERS)

        data = json.loads(response.text)

        embed = discord.Embed(title=f'Portfolio from {ctx.author}',
                                    color=0x0000ff)

        portfolio = data['portfolio']
        cash = data['cash']

        tickers = [x["ticker"] for x in data['stocks']]
        prices = [str(x["price"]) for x in data['stocks']]
        shares = [str(x["shares"]) for x in data['stocks']]

        tickers = '\n'.join(tickers)
        prices = '\n'.join(prices)
        shares = '\n'.join(shares)

        embed.add_field(name='Cash', value=f'`$ {cash}`', inline=False)
        embed.add_field(name='Portfolio', value=f'`$ {portfolio}`', inline=False)
        embed.add_field(name='Stock Ticker',
                        value=f'```{tickers}```', inline=True)
        embed.add_field(
            name='Shares', value=f'```{shares}```', inline=True)
        embed.add_field(name='Current Price',
                        value=f'```{prices}```', inline=True)

        await ctx.send(embed=embed)

def setup(client):
    client.add_cog(StockGame(client))
