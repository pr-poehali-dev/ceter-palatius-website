import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Обеденная тарелка Premium',
    price: 3500,
    image: 'https://cdn.poehali.dev/projects/1dced497-43d2-4363-aab3-0c1e67602413/files/07ee846e-3b69-44bf-af04-22ff0809e3af.jpg',
    rating: 5,
    category: 'Тарелки'
  },
  {
    id: 2,
    name: 'Набор столовых приборов',
    price: 12000,
    image: 'https://cdn.poehali.dev/projects/1dced497-43d2-4363-aab3-0c1e67602413/files/179d2be0-1e7d-458d-9a6a-4bd82984ac01.jpg',
    rating: 5,
    category: 'Приборы'
  },
  {
    id: 3,
    name: 'Кофейная пара',
    price: 4200,
    image: 'https://cdn.poehali.dev/projects/1dced497-43d2-4363-aab3-0c1e67602413/files/3b9f56d5-edab-4a64-a33b-2158228badd4.jpg',
    rating: 5,
    category: 'Чашки'
  },
  {
    id: 4,
    name: 'Набор бокалов Premium',
    price: 8500,
    image: 'https://cdn.poehali.dev/projects/1dced497-43d2-4363-aab3-0c1e67602413/files/179d2be0-1e7d-458d-9a6a-4bd82984ac01.jpg',
    rating: 5,
    category: 'Бокалы'
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Ceter Palatius</h1>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-accent transition-colors duration-300">Главная</a>
            <a href="#catalog" className="hover:text-accent transition-colors duration-300">Каталог</a>
            <a href="#about" className="hover:text-accent transition-colors duration-300">О нас</a>
            <a href="#contact" className="hover:text-accent transition-colors duration-300">Контакты</a>
          </nav>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative hover:text-accent transition-colors duration-300">
                  <Icon name="Heart" size={24} />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                      {favorites.length}
                    </Badge>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Избранное</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  {favorites.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Нет избранных товаров</p>
                  ) : (
                    <div className="space-y-4">
                      {products.filter(p => favorites.includes(p.id)).map(product => (
                        <Card key={product.id} className="p-4 flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.price.toLocaleString()} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <Icon name="X" size={18} />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <button className="relative hover:text-accent transition-colors duration-300">
                  <Icon name="ShoppingCart" size={24} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                      {cart.length}
                    </Badge>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col h-full">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      <div className="flex-1 space-y-4 overflow-auto">
                        {cart.map((item, index) => (
                          <Card key={index} className="p-4 flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(index)}
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${products[1].image})` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(45, 45, 45, 0.3)' }}></div>
        </div>
        <div className="relative z-10 text-center text-primary-foreground px-4 animate-fade-in">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
            Эстетика вашего дома
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style={{ color: '#D4D4D4' }}>
            Посуда, которая вдохновляет на кулинарные подвиги
          </p>
          <Button 
            size="lg"
            className="px-8 py-6 text-lg hover-scale"
            style={{ 
              backgroundColor: '#C0A080', 
              color: '#2D2D2D',
              border: 'none'
            }}
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Смотреть коллекцию
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Популярное
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover-scale bg-card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 rounded-full p-2 transition-colors duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C0A080'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
                  >
                    <Icon 
                      name="Heart" 
                      size={20} 
                      style={{
                        color: favorites.includes(product.id) ? '#C0A080' : '#2D2D2D',
                        fill: favorites.includes(product.id) ? '#C0A080' : 'none'
                      }}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={16} 
                        style={{
                          color: i < product.rating ? '#C0A080' : '#D4D4D4',
                          fill: i < product.rating ? '#C0A080' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-bold mb-4" style={{ color: '#2D2D2D' }}>{product.price.toLocaleString()} ₽</p>
                  <Button 
                    variant="outline"
                    className="w-full transition-all duration-300"
                    style={{
                      borderColor: '#C0A080',
                      color: '#C0A080',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C0A080';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#C0A080';
                    }}
                    onClick={() => addToCart(product)}
                  >
                    В корзину
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4" style={{ backgroundColor: '#2D2D2D' }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: '#F5F5F5' }}>О нас</h2>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#D4D4D4' }}>
            Ceter Palatius — это премиум коллекция посуды для тех, кто ценит качество и эстетику. 
            Мы создаем не просто предметы сервировки, а произведения искусства, которые превращают 
            каждый прием пищи в особенное событие. Наша миссия — вдохновлять людей на создание 
            уютной атмосферы в их доме.
          </p>
        </div>
      </section>

      <footer id="contact" className="py-12 px-4" style={{ backgroundColor: '#2D2D2D' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>Ceter Palatius</h3>
              <p style={{ color: '#D4D4D4' }}>Премиум посуда для вашего дома</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#F5F5F5' }}>Контакты</h4>
              <p style={{ color: '#D4D4D4' }} className="mb-2">Email: info@ceterpalatius.ru</p>
              <p style={{ color: '#D4D4D4' }}>Телефон: +7 (495) 123-45-67</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#F5F5F5' }}>Социальные сети</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="transition-colors duration-300"
                  style={{ color: '#D4D4D4' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C0A080'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D4D4D4'}
                >
                  <Icon name="Instagram" size={24} />
                </a>
                <a 
                  href="#" 
                  className="transition-colors duration-300"
                  style={{ color: '#D4D4D4' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C0A080'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D4D4D4'}
                >
                  <Icon name="Facebook" size={24} />
                </a>
                <a 
                  href="#" 
                  className="transition-colors duration-300"
                  style={{ color: '#D4D4D4' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C0A080'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D4D4D4'}
                >
                  <Icon name="Mail" size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 text-center" style={{ borderTop: '1px solid #555555', color: '#888888' }}>
            <p>© 2025 Ceter Palatius. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;