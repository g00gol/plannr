from bson import ObjectId


def oid_to_str(input_dict: dict) -> dict:
    """
    Converts ObjectId to string for all keys in a dictionary (deeply nested).
    """
    for key, value in input_dict.items():
        if isinstance(value, ObjectId):
            input_dict[key] = str(value)
        elif isinstance(value, dict):
            oid_to_str(value)
        elif isinstance(value, list):
            for i, item in enumerate(value):
                if isinstance(item, dict):
                    oid_to_str(item)
                elif isinstance(item, ObjectId):
                    value[i] = str(item)
    return input_dict
