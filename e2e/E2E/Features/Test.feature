Feature: Image Gallery

  Scenario: 1.1.1 - Upload Image File

    Given Open the web page
    When Check that web page is appeared.
    When Click plus button on right top of the page. And upload image file
    Then Uploaded image is appeared

  Scenario: 1.1.2 - Delete Image

    Given One image file is appeared.
    When Click the image.
    When When shows up gallery popup, click trash icon button.
    When Confirm dialog shows up and click “OK” button.
    Then Uploded image is disappeared on the page.

  Scenario: 1.1.3 - Upload Multi Image Files

    When Click plus button on right top of the page. And upload multi image files
    Then Uploaded images are appeared

  Scenario: 1.1.4 - Upload Non Image File

    When Click plus button on right top of the page. And upload non image file
    Then Non image file never uploaded

  Scenario: 1.1.5 - Upload Image File up to 4MB

    When Click plus button on right top of the page. And upload image file up to 4MB
    Then image file up to 4MB never uploaded

  Scenario: 1.1.6 - Upload Image Files up to 4MB

    When Click plus button on right top of the page. And upload image files up to 4MB
    Then image files up to 4MB never uploaded

  Scenario: 1.2.1 - Previous image is loaded
    When Click the image.
    When Click on Back Button.
    Then Check that other image is showing.

  Scenario: 1.2.2 - Next image is loaded
    When Click on Next Button.
    Then Check that first image is showing.

  Scenario: 1.2.3 - Close Image Gallery PopUp
    When Click on Cross Button
    Then Check that Gallery slide popup is disappeared.