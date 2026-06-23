from .models import CarMake, CarModel

def initiate():
    car_make_data = [
        {"name": "Toyota", "description": "Reliable Japanese cars"},
        {"name": "Honda", "description": "Excellent engines and reliability"},
        {"name": "Ford", "description": "American muscle and trucks"},
        {"name": "Nissan", "description": "Innovative and affordable"},
        {"name": "Chevrolet", "description": "Classic American brand"}
    ]

    car_make_instances = []
    for data in car_make_data:
        car_make_instances.append(CarMake.objects.create(name=data['name'], description=data['description']))

    car_model_data = [
        {"name": "Corolla", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[0], "dealer_id": 1},
        {"name": "Camry", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[0], "dealer_id": 1},
        {"name": "RAV4", "type": "SUV", "year": 2023, "car_make": car_make_instances[0], "dealer_id": 1},
        {"name": "Prius", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[0], "dealer_id": 1},
        
        {"name": "Civic", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[1], "dealer_id": 1},
        {"name": "Accord", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[1], "dealer_id": 1},
        {"name": "CR-V", "type": "SUV", "year": 2023, "car_make": car_make_instances[1], "dealer_id": 1},
        {"name": "Pilot", "type": "SUV", "year": 2023, "car_make": car_make_instances[1], "dealer_id": 1},
        
        {"name": "Mustang", "type": "SPORTS", "year": 2023, "car_make": car_make_instances[2], "dealer_id": 2},
        {"name": "Explorer", "type": "SUV", "year": 2023, "car_make": car_make_instances[2], "dealer_id": 2},
        {"name": "F-150", "type": "SUV", "year": 2023, "car_make": car_make_instances[2], "dealer_id": 2},
        {"name": "Escape", "type": "SUV", "year": 2023, "car_make": car_make_instances[2], "dealer_id": 2},
        
        {"name": "Altima", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[3], "dealer_id": 3},
        {"name": "Pathfinder", "type": "SUV", "year": 2023, "car_make": car_make_instances[3], "dealer_id": 3},
        {"name": "Sentra", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[3], "dealer_id": 3},
        {"name": "Rogue", "type": "SUV", "year": 2023, "car_make": car_make_instances[3], "dealer_id": 3},
        
        {"name": "Cruze", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[4], "dealer_id": 4},
        {"name": "Equinox", "type": "SUV", "year": 2023, "car_make": car_make_instances[4], "dealer_id": 4},
        {"name": "Silverado", "type": "SUV", "year": 2023, "car_make": car_make_instances[4], "dealer_id": 4},
        {"name": "Malibu", "type": "SEDAN", "year": 2023, "car_make": car_make_instances[4], "dealer_id": 4}
    ]

    for data in car_model_data:
        CarModel.objects.create(
            name=data['name'],
            type=data['type'],
            year=data['year'],
            car_make=data['car_make'],
            dealer_id=data['dealer_id']
        )
