import { Body, Controller, Get, Query, Render, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './models/interfaces/Products.interface.js';
import { CreateProductDto } from './models/DTOs/CreateProductDto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  private products: Product[] = [
    {
      "name": "Vezeték nélküli egér",
      "category": "elektronika",
      "price": 8990,
      "stock": 12
    },
    {
      "name": "Programozás kezdőknek",
      "category": "könyv",
      "price": 6490,
      "stock": 4
    },
    {
      "name": "Mechanikus billentyűzet",
      "category": "elektronika",
      "price": 24990,
      "stock": 3
    },
    {
      "name": "Fekete kapucnis pulóver",
      "category": "ruházat",
      "price": 12990,
      "stock": 8
    },
    {
      "name": "Catan társasjáték",
      "category": "játék",
      "price": 11990,
      "stock": 0
    },
    {
      "name": "USB-C töltőkábel",
      "category": "elektronika",
      "price": 4990,
      "stock": 25
    },
    {
      "name": "Adidas sportcipő",
      "category": "ruházat",
      "price": 27990,
      "stock": 2
    },
    {
      "name": "A kis herceg",
      "category": "könyv",
      "price": 3990,
      "stock": 15
    },
    {
      "name": "LEGO City rendőrségi állomás",
      "category": "játék",
      "price": 34990,
      "stock": 5
    },
    {
      "name": "Bluetooth hangszóró",
      "category": "elektronika",
      "price": 15990,
      "stock": 7
    }
  ];

  @Get()
  @Render('index')
  getHello() {
    const productsClone = [...this.products];
    productsClone.sort((a, b) => a.price - b.price);
    console.log(productsClone);
    return {
      products: productsClone
    };
  };

  @Get("filter")
  @Render("filter")
  getFilter(@Query("category") category: string) {
    const productsCloneFiltered = [...this.products].filter((product) => product.category == category);
    productsCloneFiltered.sort((a, b) => b.stock - a.stock);

    return {
      products: productsCloneFiltered
    }
  }

  @Post("new")
  @Render("new")
  postNew(@Body() CreateProductDto: CreateProductDto) {
    console.log(CreateProductDto)
    this.products.push(CreateProductDto);
    return {
      success: true
    };
  };
  @Get("new")
  @Render("new")
  getNew() {
    return {
      success: false
    };
  };
  @Get("stats")
  @Render("stats")
  getStats() {
    const productsClone = [...this.products];
    const productsCount = productsClone.length;
    let productsSumPrice = 0;
    let productsMaxPrice = productsClone[0].price;
    let productsMinPrice = productsClone[0].price;
    productsClone.forEach((product: Product) => {
      const productPrice = product.price
      productsSumPrice += productPrice;
      if (productPrice < productsMinPrice) {
        productsMinPrice = productPrice
      };
      if (productPrice > productsMaxPrice) {
        productsMaxPrice = productPrice
      };
    });
    const productsAvgPrice = Math.round(productsSumPrice / productsCount);
    // console.log(productsCount);
    // console.log(productsAvgPrice);
    // console.log(productsMinPrice);
    // console.log(productsMaxPrice);
    return {
      productsCount:productsCount,
      productsAvgPrice:productsAvgPrice,
      productsMinPrice:productsMinPrice,
      productsMaxPrice:productsMaxPrice
    };
  };
};
